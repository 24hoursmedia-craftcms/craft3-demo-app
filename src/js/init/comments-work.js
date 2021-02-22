/**
 * Bootstraps comments work jquery scripts
 */

// INITIALIZE
$(document).ready(() => {
    // load dynamic comments
    $('.js-xhr-comments').each(function () {
        loadComments($(this));
    });
});

/**
 * Handle submission of a comments form by posting it's fields through ajax,
 * and on success, refresh some container containing comments (also with ajax)
 *
 * The form should look like this:
 * <form class="js-xhr-comments-form"
 *      data-xhr-comments-action="https://the-ajax-endpoint"
 *      xhr-comments-selector="#some selector"
 * >
 * ...
 * </form>
 * <div id="#some selector" class="js-xhr-comments"
 *      data-xhr-comments-url="https://some-comments-ajax-endpoint">
 *
 */
$(document).on('submit', 'form.js-xhr-comments-form', function (e) {
    e.preventDefault();
    const
        $form = $(this),
        action = $form.data('xhr-comments-action'),
        data = $form.serialize()
    ;
    $form.find($(':input').prop('disabled', true));
    $.ajax({
        url: action,
        method: 'POST',
        data: data,
        success: (result) => {
            if ((result.success ?? false)) {
                const
                    selector = $form.data('xhr-comments-selector'),
                    $container = $(selector);
                loadComments($container);
            }
            $form.trigger('reset');
            $form.find($(':input').prop('disabled', false));
        },
        error: () => {
            alert('An error occurred');
        }
    });
});

// FUNCTIONS

/**
 * Dynamically load comments from an element that looks like this:
 * <div class="js-xhr-comments" data-xhr-comments-url="https://.."></div>
 *
 * @param $container
 */
const loadComments = ($container) => {
    const url = $container.data('xhr-comments-url');
    loadHtml($container, url);
}

/**
 * Load html from an url into a container
 */
const loadHtml = ($container, url) => {
    $.ajax({
            url: url,
            success: (content) => {
                $container.html(content);
            },
            error: () => {
                $container.html('<div>ERROR</div>');
            }
        }
    );
}